import React, { useState, useEffect } from 'react';

function DateTable() {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const daysInMonth = 31; // Promijenite ovo ovisno o mjesecu
  const defaultOption = "-";
  const options = ["VG", "BO", "GO", "DB", "PD", "ZG", "HO", "-"];
  const people = [
    "Bošnjak",
    "Buzov",
    "Galjuf",
    "Gršetić",
    "Hačić",
    "Huzjak",
    "Jozić",
    "Kolarec",
    "Markuz",
    "Muža",
    "Sedmak",
    "Sivonjić",
    "Šebek",
    "Žigić",
    "Žagar"
    // Dodajte ostala imena ljudi ovdje
  ];

  const isWorkday = (day) => day >= 1 && day <= 5;

  const handleOptionChange = (date, person, option) => {
    const newSelectedOptions = { ...selectedOptions };
    if (!newSelectedOptions[date]) {
      newSelectedOptions[date] = {};
    }
    newSelectedOptions[date][person] = option;
    setSelectedOptions(newSelectedOptions);
  };

  useEffect(() => {
    const updateCurrentDate = () => {
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = today.toLocaleDateString(undefined, options);
      setCurrentDate(formattedDate);
    };

    const interval = setInterval(updateCurrentDate, 1000);

    updateCurrentDate();

    return () => clearInterval(interval);
  }, []);

    return (
        <div>
          <p>Trenutni datum: {currentDate}</p>
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                {people.map((person) => (
                  <th key={person}>{person}</th>
                ))}
                <th>Bilješke</th> {/* Dodajte praznu kolonu za bilješke */}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: daysInMonth }, (_, index) => {
                const currentDate = new Date();
                currentDate.setDate(index + 1);
                const dayOfWeek = currentDate.getDay();
    
                if (isWorkday(dayOfWeek)) {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      {people.map((person) => (
                        <td key={person}>
                          <select
                            value={selectedOptions[index + 1]?.[person] || defaultOption}
                            onChange={(e) =>
                              handleOptionChange(index + 1, person, e.target.value)
                            }
                          >
                            {options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                      ))}
                      <td>
                        <input
                          type="text"
                          placeholder="Unesite bilješke"
                          // Ovdje možete dodati funkcionalnost za spremanje bilješki
                        />
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
      );
    }

export default DateTable;
