import { useEffect, useState } from "react";

const UseEffectTest = () => {
    const [count, setCount] = useState(10);
    useEffect(() => {
        console.log(`🔄 count hat sich geändert: ${count}`);
    }, [count]); // Läuft nur, wenn count sich ändert!

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Erhöhen</button>
        </div>
    );
}

export default UseEffectTest