import { Chip } from '../domain/Chip';
import { ChipGetter } from '../domain/ChipGetter';

export class GetChip {
    private readonly chipGetter: ChipGetter;

    constructor(chipGetter: ChipGetter) {
        this.chipGetter = chipGetter;
    }

    execute(): Chip {
        return this.chipGetter.get();
    }
}
