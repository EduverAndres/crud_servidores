import { Test, TestingModule } from '@nestjs/testing';
import { ServidoresController } from './servidores.controller';

describe('ServidoresController', () => {
  let controller: ServidoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServidoresController],
    }).compile();

    controller = module.get<ServidoresController>(ServidoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
