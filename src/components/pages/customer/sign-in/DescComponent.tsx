'use client'
// import { useRouter } from 'next/router'


const DescComponent = ({ title, description }: { title: any, description: any }) => {
  return (
    <div
      className="flex items-center rounded-b-lg bg-designColor lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
      // style={{ backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%);' }}
      style={{
        background: 'linear-gradient(to right, #235475, #56a4d9, #3e95d0, #1495ea)',
      }}
    >
      <div className=" px-4 py-6  md:mx-6 md:p-12">
        <h4 className="mb-6 text-xl font-semibold text-txtWhite ">{`${title}`}</h4>
        <p className="text-sm leading-7  text-txtlightGrey">{`${description}`}</p>
      </div>
    </div>
  )
}
export default DescComponent
