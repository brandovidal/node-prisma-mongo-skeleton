import { Router, type NextFunction, type Request, type Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import authRouter from '../components/auth/routes'
import userRouter from '../components/user/routes'
import postRouter from '../components/post/routes'

import type BaseError from '../utils/appError'
import { AppError, AppSuccess } from '../utils'

const router = Router()

router.use('/api/auth', authRouter)
router.use('/api/users', userRouter)
router.use('/api/posts', postRouter)

router.get('/', function (req, res) {
  res.send('Node API is running!')
})

router.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  })
)

router.all('*', (req: Request, res: Response, next: NextFunction): void => {
  next(AppError(404, 'not_found', `Route ${req.originalUrl} not found`))
})

router.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
  const { status, code, message } = err

  res.status(status).json(AppSuccess)

  res.status(status).json({
    status,
    code,
    message
  })
})

export { router }
