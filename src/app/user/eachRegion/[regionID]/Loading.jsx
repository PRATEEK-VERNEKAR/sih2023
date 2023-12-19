export default function Loading(){

    const pram = {width:"56px",boxShadow:"0 0 15px 2px #323643",borderRadius:"8px",columnGap:"4px"};
    const parm1 = {backgroundColor:"#323643",borderRadius:"8px",padding:"4px"}

    return (
        <>
        <div key={index} className='flex flex-col' style={{width:"256px",borderRadius:"8px",overflow:"hidden"}}>
            <div className="w-[256px] h-[256px] bg-[#323643]"></div>
                <div className='flex flex-row flex-wrap justify-between gap-x-2 gap-y-2' style={{padding:"8px"}}>
                <div className='flex flex-row' style={{...pram}} ><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/aircraft.svg" width={24} height={24} className='block' alt="Aircraft" /></div><div className='flex flex-row items-center'><span className='block'></span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/building.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'></span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/grounds.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'></span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/road.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'></span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/vehicle.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'></span></div></div>
                <div className='flex flex-row' style={{...pram}}><div style={{...parm1}} className='flex flex-row items-center justify-center'><Image src="/water.svg" width={24} height={24} alt="Aircraft" className='block' /></div><div className='flex flex-row items-center'><span className='block'></span></div></div>
                </div>
        </div>
        
        </>
    )
}