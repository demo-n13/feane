import { getModelToken } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing"
import { CategoryService, Category } from "@modules";

describe("CategoryService", () => {
    let service: CategoryService;
    let categoryMockModel: Partial<typeof Category>


    beforeEach(async () => {
        categoryMockModel = {
            findAll: jest.fn().mockResolvedValue([{id: 1, name: "Category name"}])
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoryService, {provide: getModelToken(Category), useValue: categoryMockModel}]
        }).compile()

        service = module.get<CategoryService>(CategoryService)
    })

    it("should be defined", async () => {
        expect(service).toBeDefined()
    })

    it("should return category", async () => {
        const categories = await service.getAllCategories()
        expect(categories).toHaveLength(1)
        expect(categories).toMatchObject([{id: 1, name: "Category name"}])
    })
})