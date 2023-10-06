

export default class Instalog {
    private secretKey: string;
    private serverUrl: string;

    constructor(secretKey: string = "", serverUrl: string = "/api") {
        this.secretKey = secretKey;
        this.serverUrl = serverUrl;
    }

    async createEvent(eventObject) {
        try {
            const response = await fetch(`${this.serverUrl}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventObject),
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            const createdEvent = await response.json();
            return createdEvent;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    async listEvents(params) {
        try {

            const queryString = Object.keys(params)
                .map((key) => `${key}=${encodeURIComponent(params[key])}`)
                .join('&');
            let url: string = `${this.serverUrl}/events`;
            if (queryString == null){
                url += `?${queryString}`;
            } 
            const response = await fetch(`${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Include query parameters as needed
            });

            if (!response.ok) {
                throw new Error('Failed to list events');
            }

            const events = await response.json();
            return events;
        } catch (error) {
            console.error('Error listing events:', error);
            throw error;
        }
    }
}