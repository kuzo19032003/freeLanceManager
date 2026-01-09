export default function TaskProgress({percent, color}: {percent: number, color: string}) {
    return (
        <div style={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', height: '7px' }}>
            <div 
                style={{ 
                    width: `${percent}%`, 
                    backgroundColor: color, 
                    height: '100%', 
                    borderRadius: '4px' 
                }} 
            />
        </div>
    );
}