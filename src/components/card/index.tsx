import Link from "next/link";

interface CardProps {
    scanner: string;
    style: string;
}


const Card = ({ scanner, style }: CardProps) => {
    const statStyle = { display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' };

    return (
        <Link
            href={`/${scanner.toLowerCase()}`}
            className={style}
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2>
                {scanner} <span>-&gt;</span>
            </h2>

            <div style={statStyle}>
                <p>Scan Success:</p>
                <p>0</p>
            </div>

            <div style={statStyle}>
                <p>Scan Fail:</p>
                <p>0</p>
            </div>
        </Link>
    )
};

export default Card;