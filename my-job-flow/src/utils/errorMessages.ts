export const ErrorMessages: Record<string, string> = {
    "STATUS_HAS_LINKED_JOBS": "Não é possível remover este status pois existem vagas vinculadas a ele. Mova as vagas primeiro.",
    "JOB_STATUS_NOT_FOUND": "O status da vaga não foi encontrado.",
    "DEFAULT_ERROR": "Ocorreu um erro na requisição."
};

export function getErrorMessage(error: any): string {
    // If we have a standardized code from our backend (ApiError)
    if (error.code) {
        return ErrorMessages[error.code] || error.message || ErrorMessages["DEFAULT_ERROR"];
    }
    
    // Ultimate fallback
    return error.message || ErrorMessages["DEFAULT_ERROR"];
}
