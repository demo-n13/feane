import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getModelToken } from '@nestjs/sequelize';
import { Category } from './models/category.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let mockCategoryModel: Partial<typeof Category>;

  beforeEach(async () => {
    mockCategoryModel = {
      findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Electronics' }]),
      create: jest.fn().mockResolvedValue({ id: 2, name: 'Clothing' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: getModelToken(Category), useValue: mockCategoryModel },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all categories', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, name: 'Electronics' }]);
  });

  it('should create a new category', async () => {
    const newCategory = await service.create({ name: 'Clothing' });
    expect(newCategory).toEqual({ id: 2, name: 'Clothing' });
  });
});
