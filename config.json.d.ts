declare namespace config {
    namespace ia {
        const access_key: string;
        const secret_key: string;
        const collection: string;
    }
    namespace database {
        export const hostname: string;
        export const username: string;
        export const password: string;
        const database_1: string;
        export { database_1 as database };
    }
    namespace storage {
        const ia_1: boolean;
        export { ia_1 as ia };
        export const local: boolean;
    }
    const storage_path: string;
    const upload_size_limit: number;
    namespace donations {
        const bitcoinAddress: string;
    }
    namespace thumbnails {
        const width: number;
        const height: number;
    }
    namespace display {
        namespace documentsPerPage {
            const gallery: number;
        }
    }
    namespace admin {
        const username_1: string;
        export { username_1 as username };
        export const hash: string;
    }
    namespace session {
        const signingKey: string;
        const path: string;
        const ttl: number;
    }
    namespace accessLog {
        const filename: string;
        const frequency: string;
        const format: string;
    }
    namespace ssl {
        const key: string;
        const cert: string;
        const ca: string;
        const ciphers: string;
    }
}
export default config;
