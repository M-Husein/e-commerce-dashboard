export const chartOptions = {
  plugins: {
    legend: {
      display: false
    }
  }
};

export const datas = [
  {
    id: 1,
    year: 2020,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2021,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2022,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2023,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2024,
    userGain: 4300,
    userLost: 234
  }
];

export const chartData = {
  labels: datas.map((data) => data.year),
  datasets: [
    {
      label: "Users Gained",
      data: datas.map((data) => data.userGain),
      backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95", "#f3ba2f", "#2a71d0"],
      borderColor: "#555",
      borderWidth: 2,
    }
  ]
};
