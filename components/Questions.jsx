'use client'
import Row from './Rows';
import { useRouter } from 'next/navigation';

const Questions = ({questions}) => {
    const rowsData = questions;
    const router = useRouter();
    console.log(rowsData)
    const handleOpenDropDown = (rowId) => {
        // Implement logic to handle dropdown opening for a specific row
        console.log(`Open dropdown for row with ID ${rowId}`);
    };

    const handleGoToThread = (rowId) => {
        // Implement logic to handle navigation to thread for a specific row
        console.log(`Going to question with ID ${rowId}`);
        router.push(`/question/${rowId}`);        
    };

    return (
        <div className='w-full flex flex-col justify-between h-full'>
            {rowsData.map((row) => (
                <Row
                    key={row.id}
                    title={row.title}
                    answers={row.answers}
                    writers={row.writers}
                    onOpenDropDown={() => handleOpenDropDown(row.id)}
                    onGoToThread={() => handleGoToThread(row.id)}
                />
            ))}
        </div>
    );
}

export default Questions