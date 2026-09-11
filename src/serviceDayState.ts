export const serviceDayWatch = {
    lastServiceDay: 0, // static-ish so change in this can be detected by stoptime
    isNextServiceDay: function (serviceDay: number): boolean {
        /*
            first entry sets lastServiceDay
            later entries either match value (same day)
            or not (next day)
        */
        
        if(!this.lastServiceDay)
        {
            this.lastServiceDay = serviceDay
            return false;
        } 

        return this.lastServiceDay !== serviceDay;
    }

}