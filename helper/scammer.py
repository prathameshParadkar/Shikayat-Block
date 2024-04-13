import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Extended example data with related phrases
messages = [
    'You have won a free Bitcoin!', 'Invest in this amazing ICO!', 'Send me your crypto for double returns.',
    'Can you help me with my crypto wallet issue?', 'Meeting for a crypto conference?', 'Payment received.',
    'Congratulations! You\'ve won a BTC giveaway!', 'Get rich quick with our crypto investment plan!',
    'Double your money in just a week!', 'We provide the best crypto trading signals.', 'Secure your crypto assets.',
    'Crypto wallet support available here.', 'Invitation to a blockchain event.', 'Invoice for crypto payment.'
]

labels = [
    'scam', 'scam', 'scam', 'legitimate', 'legitimate', 'legitimate',
    'scam', 'scam', 'scam', 'legitimate', 'legitimate', 'legitimate',
    'legitimate', 'legitimate'
]

# Create TF-IDF vectorizer and transform the text data
vectorizer = TfidfVectorizer(stop_words='english')
X_tfidf = vectorizer.fit_transform(messages)

# Train a Naive Bayes classifier
clf = MultinomialNB()
clf.fit(X_tfidf, labels)
