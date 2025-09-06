export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-white dark:bg-gray-600/10 border border-gray-500/30 shadow-md rounded-lg p-4 m-4 flex-1'>
      {children}
    </div>
  )
}
