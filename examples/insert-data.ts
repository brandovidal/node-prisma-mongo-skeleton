import { PrismaClient, Tag, type Prisma } from '@prisma/client'
import { logger } from '../src/utils/logger'

const prisma = new PrismaClient()

export const insertUserAndPost = async (): Promise<void> => {
  const userInput: Prisma.UserUncheckedCreateInput = {
    email: 'ian.watson@got.com',
    name: 'Ian Watson',
    username: 'ianwatson',
    password: 'password'
  }

  const createdUser = await prisma.user.create({
    data: userInput
  })

  const commentsInput: Prisma.CommentCreateInput[] = [
    {
      text: 'My first comment',
      voteCount: 14,
      updatedAt: new Date()
    }
  ]

  const postInput: Prisma.PostUncheckedCreateInput = {
    authorId: createdUser.id,
    comments: commentsInput,
    content: 'My first post text content',
    isPublished: false,
    tags: [Tag.NodeJS, Tag.Docker, Tag.GraphQL],
    title: 'My first post title',
    viewCount: 23
  }

  const createdPost = await prisma.post.create({
    data: postInput
  })
  logger.info({ createdUser })
  logger.info({ createdPost })

  const newComment: Prisma.CommentCreateInput = {
    text: 'A new comment in the post created above',
    updatedAt: new Date(),
    voteCount: 32
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: createdPost.id
    },
    data: {
      comments: {
        push: [newComment]
      }
    }
  })

  logger.info({ updatedPost })
}

// void insertUserAndPost().then()
