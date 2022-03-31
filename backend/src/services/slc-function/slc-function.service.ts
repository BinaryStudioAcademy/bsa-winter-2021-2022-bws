import {
  SLCFunctionCreateResponseDto,
  SLCFunctionGetRequestParamsDto,
  SLCFunctionGetResponseDto,
  SLCFunctionUpdateResponseDto,
  SLCFunctionLoadParamsDto,
  SLCFunctionLoadResponseDto,
  SLCFunctionRunResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { slcFunction as slcFunctionRep } from '~/data/repositories/repositories';
import { SLCFunction as SLCFunctionEntity } from './slc-function.entity';
import { SLCError } from '~/exceptions/exceptions';
import {
  HttpCode,
  ExceptionMessage,
  LambdaDefaultParam,
} from '~/common/enums/enums';
import { token as tokenServ, lambda as lambdaServ } from '~/services/services';

type Constructor = {
  slcFunctionRepository: typeof slcFunctionRep;
  tokenService: typeof tokenServ;
  lambdaService: typeof lambdaServ;
};

class SLCFunction {
  #slcFunctionRepository: typeof slcFunctionRep;
  #tokenService: typeof tokenServ;
  #lambdaService: typeof lambdaServ;

  constructor({
    slcFunctionRepository,
    tokenService,
    lambdaService,
  }: Constructor) {
    this.#slcFunctionRepository = slcFunctionRepository;
    this.#tokenService = tokenService;
    this.#lambdaService = lambdaService;
  }

  public async create({
    name,
    token,
  }: {
    name: string;
    token: string;
  }): Promise<SLCFunctionCreateResponseDto> {
    const { userId: createdBy } =
      this.#tokenService.decode<TokenPayload>(token);

    const slcFunctionByName = await this.#slcFunctionRepository.getByName(name);

    if (slcFunctionByName) {
      throw new SLCError();
    }

    const sourceCode = LambdaDefaultParam.SOURCE_CODE;

    const { FunctionArn } = await this.#lambdaService.createFunction({
      name,
      sourceCode,
    });

    if (!FunctionArn) {
      throw new SLCError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: ExceptionMessage.FUNCTION_NOT_CREATED,
      });
    }

    const slcFunction = SLCFunctionEntity.createNew({
      name,
      sourceCode,
      createdBy,
      awsLambdaId: FunctionArn,
    });

    await this.#slcFunctionRepository.create(slcFunction);

    return { name: slcFunction.name };
  }

  public async getSLCFunctionsByTenant({
    query,
    token,
  }: {
    query: SLCFunctionGetRequestParamsDto;
    token: string;
  }): Promise<SLCFunctionGetResponseDto> {
    const { from, count } = query;
    const { tenantId } = await this.#tokenService.decode(token);

    const filter = {
      from,
      count,
      tenantId,
    };

    const slcFunctions = await this.#slcFunctionRepository.getAllByTenant(
      filter,
    );
    const countItems = await this.#slcFunctionRepository.getCount(filter);

    return { items: slcFunctions, countItems };
  }

  public async delete(id: string): Promise<void> {
    const slcFunction = await this.#slcFunctionRepository.getById(id);

    if (!slcFunction) {
      throw new SLCError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.FUNCTION_NOT_FOUND,
      });
    }

    await this.#lambdaService.deleteFunction(slcFunction.name);

    await this.#slcFunctionRepository.delete(id);
  }

  public async updateById({
    id,
    sourceCode,
  }: {
    id: string;
    sourceCode: string;
  }): Promise<SLCFunctionUpdateResponseDto> {
    const slcFunction = await this.#slcFunctionRepository.getById(id);

    if (!slcFunction) {
      throw new SLCError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.FUNCTION_NOT_FOUND,
      });
    }

    if (slcFunction.sourceCode === sourceCode) {
      throw new SLCError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.FUNCTION_NOT_CHANGE,
      });
    }

    await this.#lambdaService.updateFunctionCode(slcFunction.name, sourceCode);

    slcFunction.setSourceCode(sourceCode);

    const updatedSLCFunction = await this.#slcFunctionRepository.save(
      slcFunction,
    );

    if (!updatedSLCFunction) {
      throw new SLCError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: ExceptionMessage.FUNCTION_NOT_UPDATED,
      });
    }

    return { sourceCode: updatedSLCFunction.sourceCode };
  }

  public async loadById({
    id,
  }: SLCFunctionLoadParamsDto): Promise<SLCFunctionLoadResponseDto> {
    const slcFunction = await this.#slcFunctionRepository.getById(id);

    if (!slcFunction) {
      throw new SLCError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.FUNCTION_NOT_FOUND,
      });
    }

    const { name, sourceCode } = slcFunction;

    return { name, sourceCode };
  }

  public async runById({
    id,
    payload,
  }: {
    id: string;
    payload?: string;
  }): Promise<SLCFunctionRunResponseDto> {
    const slcFunction = await this.#slcFunctionRepository.getById(id);

    if (!slcFunction) {
      throw new SLCError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.FUNCTION_NOT_FOUND,
      });
    }

    const responsePayload = await this.#lambdaService.runFunction(
      slcFunction.name,
      payload,
    );

    return { payload: responsePayload };
  }
}

export { SLCFunction };
