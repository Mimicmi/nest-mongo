import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {


  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }


  create(createPostDto: CreatePostDto) {
    const newPost = new this.postModel(createPostDto);
    return newPost.save();
  }

  findAll() {
    return this.postModel.find().populate('author');
  }

  findOne(id: number) {
    return this.postModel.findById(id).populate('author');
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate(id, UpdatePostDto, { new: true });
  }

  remove(id: number) {
    return this.postModel.findByIdAndRemove(id);
  }
}
