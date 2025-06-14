import React from 'react'

function LevelTab(props: any) {
    const handleClick = () => {
        props.onClick(props.name) // Pass the name of the level to the parent component
    }

    const isSelected = props.selectedLevel === props.name

    return (
        <button 
            className={`
                inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium
                transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                disabled:pointer-events-none disabled:opacity-50
                ${isSelected 
                    ? 'bg-background text-foreground shadow-sm border' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
            `}
            onClick={handleClick}
        >
            {props.name}
        </button>
    );
}

export default LevelTab 