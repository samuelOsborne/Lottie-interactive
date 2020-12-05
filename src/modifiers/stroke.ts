export class Stroke {

    public static changeStrokeWidthColor(data: any, strokeWidth: string, strokeHex: string) {
        if (data !== null && !(strokeHex === null && strokeWidth === null)) {
            if ( typeof data == "object" ) {
                Object.entries(data).forEach(([key, value]) => {
                    if (key === "ty" && value === "st") {
                        if (strokeWidth !== null)
                            data.w.k = Number(strokeWidth);
                        if (strokeHex !== null)
                            data.c.k = this.hexToRgbA(strokeHex);
                    }
                    this.changeStrokeWidthColor(value, strokeWidth, strokeHex);
                });
            }
        }
    }

    public static changeWidth(data: any, strokeWidth: string) {
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

    public static changeColor(data: any, strokeHex: string) {
        if (data !== null) {
            if ( typeof data == "object" ) {
                Object.entries(data).forEach(([key, value]) => {
                    if (key === "ty" && value === "st") {
                        data.c.k = this.hexToRgbA(strokeHex);
                    }
                    this.changeColor(value, strokeHex);
                });
            }
        }
    }

    public static scaleRGB(n: number) {
        return Math.round((n / 255 ) * 100) / 100;
    }

    public static hexToRgbA(hex: string) : Array<Number> {
        let c: any;
        let list: Array<number> = new Array<number>();

        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x' + c.join('');
            list.push(this.scaleRGB(c>>16&255));
            list.push(this.scaleRGB(c>>8&255));
            list.push(this.scaleRGB(c&255));
            list.push(1);
            return list;
        }
        return (this.hexToRgbA("#000000"))
    }

}
