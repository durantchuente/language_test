import {Language} from '../../interfaces/language.model';

export class AddLanguage {
    static readonly type = '[Language] Add';

    constructor(public payload: Language) {
    }
}

export class GetLanguages {
    static readonly type = '[Language] Get';
}

export class UpdateLanguage {
    static readonly type = '[Language] Update';

    constructor(public payload: Language, public id: number) {
    }
}

export class DeleteLanguage {
    static readonly type = '[Language] Delete';

    constructor(public id: string) {
    }
}

export class SetSelectedLanguage {
    static readonly type = '[Language] Set';

    constructor(public payload: Language) {
    }
}