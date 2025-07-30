import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'sliceTitle'
})
export class SliceTitlePipe implements PipeTransform {
    transform(value: string, maxLenght: number = 25): string {
        if (!value) {
            return '';
        }

        return value.length > maxLenght ? value.slice(0, maxLenght) + '...' : value;
    }
}
