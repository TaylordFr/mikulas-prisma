import { Injectable } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KidsService {
  constructor(private readonly db: PrismaService){}

  
  create(createKidDto: CreateKidDto) {
    try {
      const newKid = this.db.kid.create({
        data: createKidDto
      });
      
      return newKid
    } catch (error){
      console.error("Error: " + error.message);
    }
  }

  findAll() {
    try {
      return this.db.kid.findMany()
    } catch (error) {
      console.error("Error: " + error.message);
    }
  }

  async findOne(id: number) {
    try {
      const found = await this.db.kid.findUnique({
        where: {id: id}
      })

      if(!found){
        return "Kid with Id not found!"
      }

      return found
    } catch (error){
      console.error("Error: " + error.message)
    }
  }

  update(id: number, updateKidDto: UpdateKidDto) {
    try {

      const updatedKid = this.db.kid.update({
        where: {id: id},
        data: updateKidDto
      })
      
      return updatedKid
    } catch (error) {
      console.error("Error: " + error.message)
    }
  }

  remove(id: number) {
    try {
      this.db.kid.delete({
        where: {id: id}
      })


      return "Kid deleted successfully"

    } catch (error) {
      console.error("Error: " + error.message)
    }
  }
}
