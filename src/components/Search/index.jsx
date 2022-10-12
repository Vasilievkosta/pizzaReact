import React from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';
import closeIconSvg from '../../assets/img/close.svg';

const Search = () => {
	const [value, setValue] = React.useState('');	
    const { setSearchValue } = React.useContext(SearchContext);	
	const inputRef = React.useRef();
	
	const onClickClear = () => {
		setValue('');
		setSearchValue('');
		inputRef.current.focus();
	};
	
	const updateSearchValue = React.useCallback(
		debounce((str) => {
			setSearchValue(str);
		}, 250),
		[],
	);
	
	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};	

    return (
        <div className={styles.root}>
            <svg className={styles.icon} height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg"><path d="M503.866,477.974L360.958,335.052c28.725-34.544,46.017-78.912,46.017-127.336  c0-110.084-89.227-199.312-199.312-199.312C97.599,8.403,8.351,97.631,8.351,207.715c0,110.064,89.248,199.312,199.312,199.312  c48.435,0,92.792-17.292,127.336-46.017l142.908,142.922L503.866,477.974z M29.331,207.715c0-98.334,79.987-178.332,178.332-178.332  c98.325,0,178.332,79.998,178.332,178.332s-80.007,178.332-178.332,178.332C109.318,386.047,29.331,306.05,29.331,207.715z" fill="#37404D" /></svg>
            <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder="Поиск пиццы..."
            />
            {value && (
                <img onClick={onClickClear} className={styles.close} src={closeIconSvg} alt="close icon" />
            )}

        </div>

    )
};

export default Search;
