import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import data from '../assets/data.json'
import { FC, useEffect, useState } from 'react';

interface CountryType {
  code: string;
  label: string;
  symbol: string;
  flag?: string;
}
interface SelectProps {
  value: CountryType,
  change: (arg: CountryType )  => void
}

export const Select: FC <SelectProps>=(props) => {
  const [countries, setCountry] = useState<CountryType[]>([]);

  useEffect(() => {
    const made: CountryType[] = [];
    if(data?.length > 0) {
      data.forEach(item => {
        made.push({
          code: item.currency.code,
          label: item.currency.name,
          symbol: item.currency.symbol,
          flag: item.flag
        })
      })
      setCountry(made)
    }
  }, [])

  return (
    <div>
      <label htmlFor="country-select-demo">From-To</label>
      <Autocomplete
      id="country-select-demo"
      sx={{ width: 330 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={option.flag}
            alt=""
          />
          {option.code} - {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
      value={props.value}
      onChange={(event, value) => {
        if (value) {
          props.change(value)
        }
      }}
    />
    </div>
  );
}

