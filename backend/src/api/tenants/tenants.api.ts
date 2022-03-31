import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  EAMTenantByIdRequestParamsDto,
  EAMTenantCreateRequestDto,
  EAMTenantUpdateRequestDto,
} from '~/common/types/types';
import { tenant as tenantServ } from '~/services/services';
import { HttpCode, HttpMethod, TenantsApiPath } from '~/common/enums/enums';
import { eamTenantUpdate as eamTenantValidationSchema } from '~/validation-schemas/validation-schemas';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';

type Options = {
  services: {
    tenant: typeof tenantServ;
  };
};

const initTenantsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { tenant: tenantService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: TenantsApiPath.$ID,
    async handler(
      req: FastifyRequest<{ Params: EAMTenantByIdRequestParamsDto }>,
      rep: FastifyReply,
    ) {
      const tenant = await tenantService.getTenantById(req.params.id);
      return rep.send(tenant).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: TenantsApiPath.$ID,
    schema: {
      body: eamTenantValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof eamTenantValidationSchema>) {
      return (
        data: EAMTenantCreateRequestDto,
      ): ReturnType<typeof eamTenantValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{
        Params: EAMTenantUpdateRequestDto;
        Body: EAMTenantUpdateRequestDto;
      }>,
      rep: FastifyReply,
    ) {
      const tenant = await tenantService.updateTenantById({
        id: req.params.id,
        name: req.body.name,
      });
      return rep.send(tenant).status(HttpCode.OK);
    },
  });
};

export { initTenantsApi };
