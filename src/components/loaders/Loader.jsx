import SyncLoader from 'react-spinners/SyncLoader'

export default function Loading() {
  return (
    <>
      <div className="w-full h-full">
        <SyncLoader
          color={'white'}
          loading={true}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mx-auto text-4xl  text-white font-bold"
        />
      </div>
    </>
  )
}
