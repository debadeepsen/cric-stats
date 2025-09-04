export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-white dark:bg-neutral-500/10 shadow-md rounded-lg p-4 m-4 flex-1'>
      {children}
    </div>
  )
}
