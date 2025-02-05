import React from 'react';
import { useReducer } from 'react';

function Quiz() {

    // initialState 
    const initialState = { 
        questions: [ 
            { 
                id: 1, 
                text: "Quel est le hook utilisé pour gérer le state ?", 
                choices: ["useEffect", "useState", "useReducer"], 
                bareme: 1, 
                answer: "useState", 
                selected: null 
            }, 
            { 
                id: 2, 
                text: "Quelle méthode permet d'envoyer une requête GET ?", 
                choices: ["fetch()", "sendRequest()", "useFetch()"], 
                bareme: 2, 
                answer: "fetch()", 
                selected: null 
            }, 
        ], 
        score: 0, 
    }; 

    // Reducer
    const reducer = (state, action) => {
        switch(action.type){
            case 'SELECT_ANSWER':
                return {
                    ...state,
                    questions: state.questions.map(question => 
                        question.id === action.payload.id
                            ? { ...question, selected: action.payload.selected }
                            : question
                    )
                };
            case 'CALCULATE_SCORE':
                const score = state.questions.reduce((acc, question) => {
                    return acc + (question.selected === question.answer ? question.bareme : 0);
                }, 0);
                return { ...state, score };
            case 'RESET_QUIZ':
                return { ...state, score: 0, questions: state.questions.map(q => ({ ...q, selected: null })) };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    function checkAnswer(questionId, answer) {
        dispatch({ 
            type: 'SELECT_ANSWER',
            payload: { id: questionId, selected: answer } 
        });
    }

    function calculateScore() {
        dispatch({ type: 'CALCULATE_SCORE' });
    }

    function resetQuiz() {
        dispatch({ type: 'RESET_QUIZ' });
    }

    return (
        <div className='container border border-dark m-3 p-3'>
            <h1 className='text-center'>Quiz</h1>
            <div className='conteneur m-3 p-3'>
                {state.questions.map((quest) => (
                    <div key={quest.id} className='m-2 p-2 w-100 border border-dark'>
                        <label>{quest.text}</label>
                        <div className='m-2 p-2'>
                            {quest.choices.map(choice => (
                                <div key={choice}>
                                    <input 
                                        type="radio" 
                                        name={`question-${quest.id}`} 
                                        value={choice} 
                                        checked={quest.selected === choice} 
                                        onChange={() => checkAnswer(quest.id, choice)} 
                                    />
                                    <label>{choice}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={calculateScore} className='btn btn-info'>Calculate Score</button>
            </div>
            <div className='m-3 p-3'>
                <p>
                    <strong>Your score is: {state.score}</strong>
                    <button className='btn btn-indo' onClick={resetQuiz}>Reset</button>
                </p>
            </div>
        </div>
    )
}

export default Quiz;
