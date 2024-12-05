import { Injectable } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToysService {
  constructor(private readonly db: PrismaService){}
  
  create(createToyDto: CreateToyDto) {
    try {
      const newToy = this.db.toy.create({
        data: createToyDto
      })

      return "New toy has been created: " + newToy

    } catch (error) {
      console.error("Error: " + error.message)
    }
  }

  findAll() {
    try {
      return this.db.toy.findMany()
    } catch (error) {
      console.error("Error: " + error.message)
    }
  }

  findOne(id: number) {
    try {
      return this.db.toy.findUnique({
        where: {id: id}
      })
    } catch (error){
      console.error("Error: " + error.message)
    }
  }

  update(id: number, updateToyDto: UpdateToyDto) {
    try{
      const updatedToy = this.db.toy.update({
        where: {id: id},
        data: updateToyDto
      })

      return "Toy has been updated: " + updatedToy
    } catch(error){
      console.error("Error: "+ error.message)
    }
  }

  remove(id: number) {
    try{
      this.db.toy.delete({
        where: {id: id}
      })

      return "Toy has been deleted succesfully"

    } catch (error){
      console.error("Error: "+ error.message)
    }
  }
}
