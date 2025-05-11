// This file contains utility functions that can be used throughout the application.
// It may include functions for formatting responses, error handling, or other helper methods.

const formatResponse = (data, message = 'Success', status = 200) => {
    return {
        status,
        message,
        data,
    };
};

const handleError = (error) => {
    console.error(error);
    return {
        status: 500,
        message: 'Internal Server Error',
        error: error.message || 'An error occurred',
    };
};

module.exports = {
    formatResponse,
    handleError,
};