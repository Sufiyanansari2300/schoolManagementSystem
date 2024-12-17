class ApiResponse {
    constructor(code, message, result = null) {
        this.code = code;
        this.message = message;
        this.result = result;
    }
}

export default ApiResponse