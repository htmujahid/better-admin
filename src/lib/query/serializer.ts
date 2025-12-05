import { StandardRPCJsonSerializer } from '@orpc/client/standard';

export const serializer = new StandardRPCJsonSerializer({
  customJsonSerializers: [
    // put custom serializers here
  ],
});
