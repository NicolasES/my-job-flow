const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    
    const headers = new Headers(options?.headers);
    
    // Adicionamos o header de JSON apenas se tivermos um 'body' sendo enviado
    if (options?.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 204) {
        return {} as T;
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Erro na API: ${response.status}`);
    }

    return response.json();
}
