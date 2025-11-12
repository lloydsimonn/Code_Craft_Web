let scoreChartInstance = null;

const chapterData = {
    '0': {
        labels: ['Print', 'Variables', 'If Else', '------'],
        scores: [85, 78, 92, 70]
    },
    '1': {
        labels: ['------', '------', '------', '------'],
        scores: [90, 75, 88, 80]
    },
    '2': {
        labels: ['------', '------', '------', '------'],
        scores: [70, 85, 80, 95]
    },
    '3': {
        labels: ['------', '------', '------', '------'],
        scores: [80, 82, 75, 88]
    },
    '4': {
        labels: ['------', '------', '------', '------'],
        scores: [95, 90, 93, 89]
    },
    '5': {
        labels: ['------', '------', '------', '------'],
        scores: [65, 70, 68, 72]
    }
};

const backgroundColors = ['#3f51b5', '#e53935', '#00bcd4', '#8e24aa'];

function createOrUpdateScoreChart(chapterKey) {
    const chapter = chapterData[chapterKey];
    
    if (!chapter) return; 

    const scoreData = {
        labels: chapter.labels,
        datasets: [{
            label: `Average Score for Chapter ${chapterKey} (%)`,
            data: chapter.scores,
            backgroundColor: backgroundColors,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderWidth: 1
        }]
    };

    const scoreCtx = document.getElementById('scoreChart').getContext('2d');

    if (scoreChartInstance) {
        scoreChartInstance.data.labels = scoreData.labels;
        scoreChartInstance.data.datasets[0].data = scoreData.datasets[0].data;
        scoreChartInstance.data.datasets[0].label = scoreData.datasets[0].label;
        
        scoreChartInstance.update();
    } else {
        scoreChartInstance = new Chart(scoreCtx, {
            type: 'bar',
            data: scoreData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Average Score (%)'
                        }
                    },
                    x: {
                         title: {
                            display: true,
                            text: 'Topics'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createOrUpdateScoreChart('0');

    const chapterSelect = document.getElementById('chapter-select');
    if (chapterSelect) {
        chapterSelect.addEventListener('change', function() {
            createOrUpdateScoreChart(this.value);
        });
    }

    const completedStudents = [1000, 687, 322, 198, 23, 7]; 
    const totalStudents = 2237;

    const studentsRemaining = completedStudents.map(completed => totalStudents - completed);
    const studentsNotCompleted = completedStudents.map(completed => totalStudents - completed);


    const levelData = {
        labels: ['Chapter 0', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5'],
        datasets: [{
            label: 'Students Completed',
            data: completedStudents,
            borderColor: '#00796b',
            backgroundColor: 'rgba(0, 121, 107, 0.2)',
            fill: true,
            stepped: 'before', 
            tension: 0.4,
            pointBackgroundColor: '#00796b',
            pointBorderColor: '#fff',
        },
        {
            label: 'Students Not Completed Yet',
            data: studentsNotCompleted,
            borderColor: '#e53935',
            backgroundColor: 'rgba(229, 57, 53, 0.2)',
            fill: true, 
            stepped: 'before', 
            tension: 0.4,
            pointBackgroundColor: '#e53935',
            pointBorderColor: '#fff',
        }
        ]
    };

    const levelCtx = document.getElementById('levelCompletionChart').getContext('2d');
    new Chart(levelCtx, {
        type: 'line',
        data: levelData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: totalStudents,
                    title: {
                        display: true,
                        text: 'Number of Students'
                    }
                }
            },
            plugins: {
                title: {
                    display: false,
                }
            }
        }
    });
});