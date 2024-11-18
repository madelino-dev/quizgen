const getRandomMultiplier = () => Math.floor(Math.random() * 5) + 1;
const formatMoney = (amount) => `$${amount.toLocaleString()}`;
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Quiz = () => {
  const [multiplier, setMultiplier] = useState(getRandomMultiplier());
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const questions = [
    {
      question: `You have a firm that starts out with ${formatMoney(65000 * multiplier)} in cash. You have three investment opportunities. The discount rate is 18%. Which investments, if any, do you undertake?`,
      alternatives: shuffleArray([
        `Invest ${formatMoney(40000 * multiplier)} today for a payoff of ${formatMoney(49000 * multiplier)} next year`,
        `Invest ${formatMoney(23000 * multiplier)} today for a payoff of ${formatMoney(30000 * multiplier)} in two years`,
        `Invest ${formatMoney(12000 * multiplier)} today for a payoff of ${formatMoney(2000 * multiplier)} every year, forever.`
      ])
    },
    {
      question: `ABC Software is considering starting a new division making phone apps. It forecasts that the free cash flows for this division in 5 years will be ${formatMoney(215000 * multiplier)}. What is the terminal value as of year 5 for the division with a 3% perpetual growth rate and a 12% discount rate?`,
      answer: () => {
        const year6CashFlow = (215000 * multiplier * 1.03);
        const terminalValue = year6CashFlow / (0.12 - 0.03);
        return `The terminal value (TV) as of year 5 is calculated using TV = (Year 6 cash flow) / (discount rate - growth rate). Year 6 cash flow = ${formatMoney(215000 * multiplier)} × 1.03 = ${formatMoney(year6CashFlow)}. TV = ${formatMoney(year6CashFlow)} / (0.12 - 0.03) = ${formatMoney(terminalValue)}.`;
      }
    },
    {
      question: "Errors in the discount rate can be problematic because:",
      alternatives: shuffleArray([
        "This can lead to mistaken investment decisions.",
        "This can lead to erroneous decisions to repurchase shares.",
        "This produces higher measured firm beta.",
        "This can lead to mistaken calculations of EBIT."
      ])
    },
    {
      question: "A typical way of obtaining the risk-free rate is by using the:",
      alternatives: shuffleArray([
        "1-year risk-free government bond rate",
        "10-year risk-free government bond rate",
        "Difference between the average market return and the return on government bonds",
        "Correlation between a firm's returns and the market returns."
      ])
    },
    {
      question: "A typical way of obtaining a firm's beta is by using the:",
      alternatives: shuffleArray([
        "1-year risk-free government bond rate",
        "10-year risk-free government bond rate",
        "Difference between the average market return and the return on government bonds",
        "Correlation between a firm's returns and the market returns."
      ])
    },
    {
      question: "It is common to use comparable firms' information as inputs for:",
      alternatives: shuffleArray([
        "A firm's capital structure.",
        "The unlevered cost of equity.",
        "A firm's tax rate.",
        "The risk-free rate."
      ])
    },
    {
      question: "What advice would you give to someone who was just starting to use modern valuation tools?",
      alternatives: shuffleArray([
        "The terminal value (and our assumptions about long-term growth rate) can have a very large impact on your calculation of the value of a firm.",
        "Ultimately, the value of a firm is negotiated between multiple parties, and discounted cash flows are only a tool that informs the negotiation.",
        "We need to take into account the possibility that the risk-free rate and the market risk premium change over time by using a higher beta in the discount rate.",
        "It is important to perform sensitivity analysis around the most critical assumptions of a model.",
        "Using multiples to value a large, well-established, firm is usually a better method than discounted cash flows."
      ])
    }
  ];

  const regenerateQuiz = useCallback(() => {
    setMultiplier(getRandomMultiplier());
    setSelectedAnswers({});
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-5 bg-gray-50">
	  <h1 className="text-4xl font-bold text-center mb-8">
        Current Multiplier: {multiplier}x
      </h1>
      <div className="space-y-5">
        {questions.map((q, questionIndex) => (
          <div key={questionIndex} className="bg-white rounded-lg p-5 shadow">
            <h3 className="font-semibold mb-3">Question {questionIndex + 1}</h3>
            <p className="mb-4">{q.question}</p>
            {q.alternatives ? (
              <div className="space-y-2">
                {q.alternatives.map((alt, optionIndex) => (
                  <label key={optionIndex} className="flex items-start p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      className="mt-1 mr-3"
                      checked={selectedAnswers[questionIndex] === optionIndex}
                      onChange={() => handleOptionSelect(questionIndex, optionIndex)}
                    />
                    <span>{alt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded">
                {q.answer()}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={regenerateQuiz}
        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate New Numbers
      </button>
    </div>
  );
};

ReactDOM.render(<Quiz />, document.getElementById('root'));