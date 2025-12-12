'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cosBase } from '@/app/components/Util'

interface Props {
  children: React.ReactNode
}

const Testimonial = (props: Props) => {
  const { children } = props

  return <div>{children}</div>
}

const TestimonialContent = (props: Props) => {
  const { children } = props

  return (
    <div className="relative flex flex-col items-center rounded-xl bg-white p-8 shadow-lg after:absolute after:-bottom-[16px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-t-[16px] after:border-r-[16px] after:border-l-[16px] after:border-t-white after:border-r-transparent after:border-l-transparent after:content-[''] dark:bg-gray-800 dark:after:border-t-gray-800">
      {children}
    </div>
  )
}

const TestimonialHeading = (props: Props) => {
  const { children } = props

  return <h3 className="text-xl font-bold">{children}</h3>
}

const TestimonialText = (props: Props) => {
  const { children } = props

  return <p className="text-center text-sm text-gray-600 dark:text-gray-400">{children}</p>
}

const TestimonialAvatar = ({ src, name, title }: { src: string; name: string; title: string }) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <Avatar className="mb-2">
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center -space-y-1">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      </div>
    </div>
  )
}

export default function WithSpeechBubbles() {
  return (
    <div className="bg-gray-100 p-4 dark:bg-gray-700">
      <div className="container mx-auto py-16 md:py-24">
        <div className="mb-10 flex flex-col items-center gap-6">
          <h2 className="text-center text-3xl font-bold">他/她们说</h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">让世界听见你的声音</p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 justify-center gap-6 md:grid-cols-2">
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>一直读下去</TestimonialHeading>
              <TestimonialText>
                我可能永远读不懂卡尔维诺，我可能不会停止读卡尔维诺。
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={'https://avatars.githubusercontent.com/u/17157965?v=4'}
              name={'Mathew Shen'}
              title={'小小白'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>喜欢卡尔维诺</TestimonialHeading>
              <TestimonialText>
                我不是奉承意大利人啊，我比较喜欢卡尔维诺。喜欢卡尔维诺。
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar src={`${cosBase}/xiaobo.jpg`} name={'王小波'} title={'作家'} />
          </Testimonial>
        </div>
      </div>
    </div>
  )
}
