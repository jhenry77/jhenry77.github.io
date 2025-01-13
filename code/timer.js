export class Timer {
    constructor(duration, func = null) {
        this.duration = duration; // Duration in milliseconds
        this.func = func;         // Callback function
        this.startTime = 0;       // Start time of the timer
        this.active = false;      // Whether the timer is active
    }

    // Activate the timer
    activate() {
        this.active = true;
        this.startTime = Date.now(); // Get the current time in milliseconds
    }

    // Deactivate the timer
    deactivate() {
        this.active = false;
        this.startTime = 0;
    }

    // Update method to check if the timer should trigger
    update() {
        if (this.active) {
            const currentTime = Date.now(); // Current time in milliseconds
            if (currentTime - this.startTime >= this.duration) {
                if (this.func && this.startTime !== 0) {
                    this.func(); // Execute the callback function
                }
                this.deactivate(); // Deactivate the timer
            }
        }
    }
}