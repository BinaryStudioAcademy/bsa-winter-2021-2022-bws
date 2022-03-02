import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const file: FastifyPluginAsync<{
  file: File;
}> = fp(async (fastify, options) => {
  fastify.decorateRequest('file', options.file);
});

export { file };
