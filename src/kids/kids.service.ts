import { Injectable } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KidsService {
  constructor(private readonly db: PrismaService) { }


  create(createKidDto: CreateKidDto) {
    try {
      const newKid = this.db.kid.create({
        data: createKidDto
      });

      return newKid
    } catch (error) {
      return { statusCode: 500, message: error.message }
    }
  }

  findAll() {
    try {
      return this.db.kid.findMany()
    } catch (error) {
      return { statusCode: 500, message: error.message }
    }
  }

  async findOne(id: number) {
    try {
      const found = await this.db.kid.findUnique({
        where: { id: id }
      })

      if (!found) {
        return {statusCode: 404, message: "Kid with Id not found!"}
      }

      return found
    } catch (error) {
      return { statusCode: 500, message: error.message }
    }
  }

  async update(id: number, updateKidDto: UpdateKidDto) {
    try {
      const updatedKid = await this.db.kid.update({
        where: { id: id },
        data: updateKidDto
      })

      if (!updatedKid) {
        return { statusCode: 404, message: "No kid with this Id!" }
      }

      return { statusCode: 200, message: updatedKid }
    } catch (error) {

      return { statusCode: 500, message: error.message }
    }
  }

  async remove(id: number) {
    try {
      const found = await this.db.kid.findUnique({
        where: { id: id }
      });

      if (!found) {
        return {statusCode: 404, message: "No kid with this id!"};
      }

      await this.db.kid.delete({
        where: { id: id }
      });

      return "Kid deleted successfully";
    } catch (error) {
      return { statusCode: 500, message: error.message }
    }
  }

  async addToyToKid(kidId: number, toyId: number){
    try {
      const toy = await this.db.toy.findUnique({
        where: { id: toyId },
        select: { name: true }, 
      });
  
      if (!toy) {
        return { message: 'Toy not found', statusCode: 404 };
      }

      const kid = await this.db.kid.findUnique({
        where: { id: kidId },
      });
  
      if (!kid) {
        return { message: 'Kid not found', statusCode: 404 };
      }
  
      const existingAssociation = await this.db.toyToKid.findUnique({
        where: {
          kidId_toyId: {
            kidId: kidId, 
            toyId: toyId,
          },
        },
      });
  
      if (existingAssociation) {
        return { message: 'The kid already has this toy.', statusCode: 409 };
      }
  
      await this.db.toyToKid.create({
        data: {
          kidId: kidId,
          toyId: toyId,
        },
      });
  
      const updatedKid = await this.db.kid.findUnique({
        where: { id: kidId },
        include: { toys: { include: { toy: true } } },
      });
  
      return { message: 'Toy successfully added to the kid', data: updatedKid };
    } catch (error: any) {
      console.error('Error:', error.message);
      return { message: 'An error occurred while adding the toy to the kid', statusCode: 500 };
    }
  }

  async removeToyFromKid(kidId: number, toyId: number) {
    try {
      const toy = await this.db.toy.findUnique({
        where: { id: toyId },
      });
  
      if (!toy) {
        return { message: 'Toy not found', statusCode: 404 };
      }
      const kid = await this.db.kid.findUnique({
        where: { id: kidId },
      });
  
      if (!kid) {
        return { message: 'Kid not found', statusCode: 404 };
      }
  
      const existingAssociation = await this.db.toyToKid.findUnique({
        where: {
          kidId_toyId: {
            kidId: kidId,
            toyId: toyId,
          },
        },
      });
  
      if (!existingAssociation) {
        return { message: 'Kid does not have this toy', statusCode: 404 };
      }
      await this.db.toyToKid.delete({
        where: {
          kidId_toyId: {
            kidId: kidId,
            toyId: toyId,
          },
        },
      });
  
      return { message: 'Toy successfully removed from the kid' };
  
    } catch (error: any) {
      console.error('Error:', error.message);
      return { message: 'An error occurred while removing the toy from the kid', statusCode: 500 };
    }
  }
  
}
