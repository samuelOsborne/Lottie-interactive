export class Stroke {
    public static changeWidth(data: any, strokeWidth: String) {
        if (data !== null) {
            if ( typeof data == "object" ) {
                Object.entries(data).forEach(([key, value]) => {
                    if (key === "ty" && value === "st") {
                        data.w.k = Number(strokeWidth);
                    }
                    this.changeWidth(value, strokeWidth);
                });
            }
        }
    }
}
