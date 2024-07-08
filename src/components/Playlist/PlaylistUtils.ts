export const getCode = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
}

export const getAccessToken = async (code: string): Promise<string | undefined> => {
    try {
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:5173/',
        });

        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa('af853d37793f454a9a00461111ffd66f:b256683158344ade8bc1cbc0db912fc9')
            },
            body: body.toString()
        });

        if (res.ok) {
            const data = await res.json();
            return data.access_token;
        } else {
            throw new Error('Failed to fetch access token');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};