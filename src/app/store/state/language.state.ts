import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Language} from '../../interfaces/language.model';
import {AddLanguage, DeleteLanguage, GetLanguages, SetSelectedLanguage, UpdateLanguage} from '../actions/language.action';
import {LanguageService} from '../../services/language.service';
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class LanguageStateModel {
    languages!: Language[];
    selectedLanguage!: Language | null;
}

@State<LanguageStateModel>({
    name: 'languages',
    defaults: {
        languages: [],
        selectedLanguage: null
    }
})

@Injectable()
export class LanguageState {

    constructor(private languageService: LanguageService) {
    }

    @Selector()
    static getLanguageList(state: LanguageStateModel) {
        return state.languages;
    }

    @Selector()
    static getSelectedLanguage(state: LanguageStateModel) {
        return state.selectedLanguage;
    }

    @Action(GetLanguages)
    getLanguages({getState, setState}: StateContext<LanguageStateModel>) {
        return this.languageService.getLanguages().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                languages: result,
            });
        }));
    }

    @Action(AddLanguage)
    addLanguage({getState, patchState}: StateContext<LanguageStateModel>, {payload}: AddLanguage) {
        return this.languageService.createLanguage(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                languages: [...state.languages, result]
            });
        }));
    }

    @Action(UpdateLanguage)
    updateLanguage({getState, setState}: StateContext<LanguageStateModel>, {payload}: UpdateLanguage) {
        return this.languageService.editLanguage(payload).pipe(tap((result) => {
            const state = getState();
            const languageList = [...state.languages];
            const languageIndex = languageList.findIndex(item => item.id === payload.id);
            languageList[languageIndex] = result;
            setState({
                ...state,
                languages: languageList,
            });
        }));
    }


    @Action(DeleteLanguage)
    deleteLanguage({getState, setState}: StateContext<LanguageStateModel>, {id}: DeleteLanguage) {
        return this.languageService.deleteLanguage(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.languages.filter(item => item.id !== id);
            setState({
                ...state,
                languages: filteredArray,
            });
        }));
    }

    @Action(SetSelectedLanguage)
    setSelectedLanguageId({getState, setState}: StateContext<LanguageStateModel>, {payload}: SetSelectedLanguage) {
        const state = getState();
        setState({
            ...state,
            selectedLanguage: payload
        });
    }
}