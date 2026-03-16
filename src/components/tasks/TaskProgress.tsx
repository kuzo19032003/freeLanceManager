export default function TaskProgress({percent, color,height}: {percent: number, color: string,height?:string}) {
    return (
        <div style={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', height: '7px' }}>
            <div 
                style={{ 
                    width: `${percent}%`, 
                    backgroundColor: color, 
                    height: height || '100%' , 
                    borderRadius: '4px' 
                }} 
            />
        </div>
    );
}