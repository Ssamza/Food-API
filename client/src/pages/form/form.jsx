import React, { useEffect, useState } from "react";
import style from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, getDiets } from "../../redux/actions";

const validate = (input) => {
  //name
  let errors = {};

  if (!input.diets.length) {
    errors.diets = "select a diet";
  }

  if (!input.title) {
    errors.title = "enter a name";
  } else if (!/[A-Z\s]+$/i.test(input.title)) {
    errors.title = "letters only";
  } else if (parseInt(input.title.length) >= 25) {
    errors.title = "max.25 characters";
  }

  if (!input.image) {
    errors.image = "enter a URL";
  } else if (!/^https?:\/\/\S+$/.test(input.image)) {
    errors.image = "please enter a valid URL";
  }

  if (!input.summary) {
    errors.summary = "enter a description";
  } else if (!/^[a-zA-Z\s]{1,20}$/.test(input.summary)) {
    errors.summary = "max. 20 words";
  }

  if (!input.healthScore) {
    errors.healthScore = "enter a score";
  } else if (!/^(?:[1-9][0-9]?|100)$/.test(input.healthScore)) {
    errors.healthScore = "only a number btw 1-100";
  }

  if (!input.analyzedInstructions) {
    errors.analyzedInstructions = "enter recipe steps";
  } else if (!/^[A-Za-z0-9\s]+$/.test(input.analyzedInstructions)) {
    errors.analyzedInstructions = "special characters not allowed";
  }
  return errors;
};

const Form = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const diets = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: "",
    diets: [],
  });

  const [errors, setErrors] = useState({});

  const [selectDiet, setSelectDiet] = useState([]);

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSelect = (event) => {
    if (input.diets.includes(event.target.value)) return;

    setInput({
      ...input,
      diets: [...input.diets, event.target.value],
    });

    const selectedDiet = diets.find(
      (diet) => diet.title === event.target.value
    );
    if (!selectedDiet) return;

    setSelectDiet([...selectDiet, selectedDiet]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !errors.title &&
      !errors.image &&
      !errors.summary &&
      !errors.healthScore &&
      !errors.analyzedInstructions
    ) {
      try {
        dispatch(addRecipe(input));
        setInput({
          title: "",
          image: "",
          summary: "",
          healthScore: "",
          analyzedInstructions: "",
          created: true,
          diets: [],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = (event) => {
    const index = input.diets.indexOf(event.target.value);
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== event.target.value),
    });
  };

  return (
    <div>
      <h2>ADD A NEW RECIPE!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="title"
            value={input.title}
            placeholder="recipe's name"
            onChange={handleChange}
          />
        </div>
        <div>{errors.title && <span>{errors.name}</span>}</div>

        <div>
          <label>Image: </label>
          <input
            type="url"
            name="image"
            value={input.image}
            placeholder="image URL"
            onChange={handleChange}
          />
        </div>
        <div>{errors.image && <span>{errors.image}</span>}</div>

        <div>
          <label>Description: </label>
          <input
            type="text"
            name="summary"
            value={input.summary}
            placeholder="recipe's summary"
            onChange={handleChange}
          />
        </div>
        <div>{errors.summary && <span>{errors.summary}</span>}</div>

        <div>
          <label>Score: </label>
          <input
            type="text"
            name="healthScore"
            value={input.healthScore}
            placeholder="recipe's health score"
            onChange={handleChange}
          />
        </div>
        <div>{errors.healthScore && <span>{errors.healthScore}</span>}</div>

        <div>
          <label>Instructions: </label>
          <input
            type="text"
            name="analyzedInstructions"
            value={input.analyzedInstructions}
            placeholder="steps for preparation"
            onChange={handleChange}
          />
        </div>
        <div>{errors.summary && <span>{errors.summary}</span>}</div>

        <div>
          <label>Diets</label>
          <div>
            <select name="diets" onChange={handleSelect}>
              {diets.map((diet, index) => {
                return (
                  <option
                    className="option_form"
                    key={index}
                    value={diet.title}
                  >
                    {diet.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <ul>
              {selectDiet.map((d, index) => {
                console.log(d);
                return (
                  <li key={index}>
                    {d.title}
                    <button
                      type="button"
                      value={d.title}
                      onClick={handleDelete}
                    >
                      x
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <input
          type="submit"
          disabled={
            errors.title ||
            errors.image ||
            errors.summary ||
            errors.analyzedInstructions ||
            errors.healthScore ||
            errors.diets
          }
          value="Add"
        />
      </form>
    </div>
  );
};
export default Form;
