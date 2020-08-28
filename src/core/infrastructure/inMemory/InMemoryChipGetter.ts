import { ChipGetter } from '../../domain/ChipGetter';
import { Chip } from '../../domain/Chip';

export class InMemoryChipGetter implements ChipGetter {
    get(): Chip {
        return { position : { row: 0, column: 0}}
    }
}
