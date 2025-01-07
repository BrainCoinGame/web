<template>
  <div class="game-container">
    <!-- Блок с информацией о пользователе -->
    <div class="info-block user-info">
      <span class="user-id">ID: {{ userId }}</span>
    </div>

    <!-- Блок для отображения общего количества очков -->
    <div class="info-block total-points-info">
      <span class="total-points">Points: {{ totalPoints }}</span>
    </div>

    <!-- Блок для YouTube видео -->
    <div class="youtube-container">
      <iframe
        class="youtube-video"
        :src="youtubeEmbedUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Прогресс-бар для уровней -->
    <div class="progress">
      <h4 class="progress-level">
        <span class="points">{{ currentPoints }}/{{ maxPoints }}</span>
        <span class="level">Level: {{ level }}</span>
      </h4>
      <div class="progress-container">
        <div
          class="progress-value"
          :style="progressStyle"
          @animationend="onAnimationEnd"
        ></div>
      </div>
    </div>

    <!-- Контейнер для изображения frog.png (кнопка) -->
    <div class="frog-container" @click="addPoints($event)">
      <img src="@/assets/frog.png" alt="Frog" class="frog" />
    </div>

    <!-- Прогресс-бар для энергии -->
    <div class="energy">
      <h4 class="energy-level">
        <span>{{ currentEnergy }} / 500</span>
      </h4>
      <div class="energy-container">
        <div
          class="energy-value"
          :style="energyStyle"
        ></div>
      </div>
    </div>

    <!-- Отображение количества очков за клик -->
    <div v-for="(text, index) in clickTexts" :key="index" class="click-text" :style="text.style">
      +{{ text.points }}
    </div>
  </div>
</template>

<style scoped>
/* Стили для YouTube контейнера */
.youtube-container {
  width: 155%; /* Увеличиваем ширину */
  max-width: 552px; /* Максимальная ширина */
  position: relative;
  padding-top: 83.125%; /* Увеличиваем высоту на 30% */
  margin-bottom: 25px; /* Поднимаем блок выше, уменьшив отступ */
  margin-top: -100px; /* Добавляем отрицательный верхний отступ */
}
.youtube-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
/* Остальные стили остаются без изменений */
.info-block {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  border: 2px solid #ffffff;
  padding: 10px;
  border-radius: 8px;
  position: absolute;
  top: 5px;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-info {
  left: -70px;
}

.total-points-info {
  right: -70px;
}

.progress {
  width: 100%;
  height: 4px;
  max-width: 400px;
  position: relative;
}

.progress-level {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  color: #ffffff;
}

.points, .level {
  font-size: 14px;
  font-weight: normal;
}

.progress-container {
  width: 100%;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-value {
  height: 100%;
  border-radius: 10px;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

.game-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  gap: 30px;
  position: relative;
  background-color: #1c1f24;
  color: #ffffff;
}

.frog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 200px;
  cursor: pointer;
  margin-top: 40px; /* Увеличиваем отступ сверху */
}

.frog {
  width: 156px;
  height: 156px;
  animation: bounce 1s infinite;
}

.energy {
  width: 100%;
  max-width: 400px;
  position: relative;
  top: 60px;
}

.energy-level {
  text-align: center;
  margin-bottom: 5px;
  color: #ffffff;
  font-size: 14px;
  font-weight: normal;
}

.energy-container {
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.energy-value {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 10px orange;
  }
  100% {
    box-shadow: 0 0 0 orange;
  }
}

@keyframes fly {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px) scale(2.2);
    opacity: 0;
  }
}

.click-text {
  position: absolute;
  font-size: 20px;
  color: green;
  animation: fly 3.15s forwards;
}
</style>

<script>
export default {
  data() {
    return {
      currentPoints: 0,
      maxPoints: 50,
      level: 1,
      progressWidth: 0,
      isAnimating: false,
      currentEnergy: 500,
      energyRecoveryRate: 5,
      energyDepletionRate: 10,
      userId: "",
      totalPoints: 0,
      clickTexts: [],
      youtubeEmbedUrl: "https://www.youtube.com/embed/gAcFPIFH-4A?autoplay=1&mute=1" // Видео будет воспроизводиться автоматически и без звука
    };
  },
  computed: {
    progressStyle() {
      return {
        width: `${this.progressWidth}%`,
        backgroundColor: this.isAnimating ? "#FFA500" : "#4CAF50",
        animation: this.isAnimating ? "pulse 0.5s ease" : "none",
      };
    },
    energyStyle() {
      return {
        width: `${(this.currentEnergy / 500) * 100}%`,
        backgroundColor: this.currentEnergy > 100 ? "#4CAF50" : "#FF5252",
      };
    },
  },
  methods: {
    generateUserId() {
      const generatedId = "user_" + Math.random().toString(36).substr(2, 9);
      return generatedId;
    },
    addPoints(event) {
      if (this.currentEnergy <= 0) return;

      const newPoints = this.currentPoints + 1;
      this.totalPoints += 1;

      if (newPoints >= this.maxPoints) {
        this.currentPoints = 0;
        this.level += 1;
        this.maxPoints = this.level * 50;
      } else {
        this.currentPoints = newPoints;
      }

      this.progressWidth = (this.currentPoints / this.maxPoints) * 100;
      this.currentEnergy = Math.max(this.currentEnergy - this.energyDepletionRate, 0);
      this.showClickText(event, 1);
      this.isAnimating = true;

      localStorage.setItem("totalPoints", this.totalPoints.toString());
    },
    onAnimationEnd() {
      this.isAnimating = false;
    },
    showClickText(event, points) {
      const rect = event.target.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const clickText = {
        points,
        style: {
          position: 'absolute',
          left: `${clickX - 20}px`,
          top: `${clickY + 200 + 60 + 30 - 30}px`,
          fontSize: '20px',
          color: '#4CAF50',
          animation: 'fly 0.3s forwards',
        }
      };

      this.clickTexts.push(clickText);

      setTimeout(() => {
        this.clickTexts.shift();
      }, 300);
    },
    recoverEnergy() {
      if (this.currentEnergy < 500) {
        this.currentEnergy = Math.min(this.currentEnergy + this.energyRecoveryRate, 500);
      }
    },
  },
  mounted() {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      this.userId = savedUserId;
    } else {
      this.userId = this.generateUserId();
      localStorage.setItem("userId", this.userId);
    }

    const savedTotalPoints = localStorage.getItem("totalPoints");
    if (savedTotalPoints) {
      this.totalPoints = parseInt(savedTotalPoints);
    }

    setInterval(this.recoverEnergy, 1000);
  },
};
</script>
