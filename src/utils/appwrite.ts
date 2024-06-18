import { Client, Databases, Query } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(`${process.env.NEXT_PUBLIC_PROJECT_ID}`);

export const databases = new Databases(client);

export { ID } from 'appwrite';

const SCANNER_STATS_DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID as string;

const STATISTICS_COLLECTION_ID = process.env.NEXT_PUBLIC_STATISTICS_COLLECTION_ID as string;

// const ERROR_COLLECTION_ID = process.env.NEXT_PUBLIC_ERROR_COLLECTION_ID;

interface ScannerStats {
    scanner: string;
    scan_success: number;
    scan_fail: number;
    total_scans: number;
    total_errors: number;
    scan_error: string[];
}

/* QUERY FUNCTIONS */
export async function addScannerStats(data: ScannerStats) {
    try {
        const scanner_exists = await databases.getDocument(SCANNER_STATS_DATABASE_ID, STATISTICS_COLLECTION_ID, data.scanner, [
            Query.equal('scanner', data.scanner)
        ]);

        console.log('Scanner Exists:', scanner_exists);

    } catch (error) {
        console.error('Add Stats Execution Error:', error)
    }
}