import React from 'react';

class CompteRebours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,  
      statut: 'déconnecté', 
    };

    this.timerID = null; 
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.statut === 'actif' && prevState.timer < 30) {
          return { timer: prevState.timer + 1 };
        } else if (prevState.timer === 30) {
          return { statut: 'Session terminée. Veuillez vous reconnecter.', timer: 30 };
        }
        return null;
      });
    }, 1000);

   window.addEventListener('mousemove', this.resetTimer);
    window.addEventListener('keydown', this.resetTimer);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.statut === 'actif' && prevState.statut !== 'actif') {
      this.setState({ timer: 0 });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.resetTimer);
    window.removeEventListener('keydown', this.resetTimer);

    // Arrêt du timer
    clearInterval(this.timerID);
  }

  // Méthode pour réinitialiser le timer et mettre le statut à "actif"
  resetTimer = () => {
    if (this.state.statut !== 'Session terminée. Veuillez vous reconnecter.') {
      this.setState({ statut: 'actif', timer: 0 });
    }
  };

  render() {
    return (
      <div className='container border border-dark'>
        <h1 className='text-center'>Compte à Rebours</h1>
        <div>
          Timer : <strong>{this.state.timer}</strong> secondes
        </div>
        <div>
          Statut : <strong>{this.state.statut}</strong>
        </div>
      </div>
    );
  }
}

export default CompteRebours;
