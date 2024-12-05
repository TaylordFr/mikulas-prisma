import { Injectable } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToysService {
  constructor(private readonly db: PrismaService) { }

  async create(createToyDto: CreateToyDto) {
    try {
      const existingToy = await this.db.toy.findFirst({
        where: { name: createToyDto.name },
      });

      if (existingToy) {
        return { statusCode: 409, message: "A toy with this name already exists!" };
      }

      const newToy = await this.db.toy.create({
        data: createToyDto,
      });

      return { statusCode: 201, message: "New toy has been created!", data: newToy };
    } catch (error: any) {
      console.error("Error:", error.message);
      return { statusCode: 500, message: "An error occurred while creating the toy." };
    }
  }

  findAll() {
    try {
      return this.db.toy.findMany()
    } catch (error) {
      return { statusCode: 500, message: error.message }
    }
  }

  findOne(id: number) {
    try {
      const target = this.db.toy.findUnique({
        where: { id: id }
      })

      if (!target) {
        return { statusCode: 404, message: "No toy found with ID" };
      }

      return target
    } catch (error) {
      return { statusCode: 500, message: error.message }
    }
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    try {
      const updatedToy = await this.db.toy.update({
        where: { id: id },
        data: updateToyDto
      })

      if (!updatedToy) {
        return false
      }

      return "Toy has been updated: " + updatedToy.name + ", " + updatedToy.material + ", " + updatedToy.weight
    } catch (error) {
      return { statusCode: 500, message: error.message }
    }
  }

  async remove(id: number) {
    try {
      const target = await this.db.toy.delete({
        where: { id: id }
      })

      if (!target) {
        return false
      }

      return "Toy has been deleted succesfully"

    } catch (error) {
      return { statusCode: 500, message: error.message }
    }
  }
}  
